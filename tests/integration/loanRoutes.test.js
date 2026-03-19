const request = require("supertest");
const mongoose = require("mongoose");

// ── Mocks ──────────────────────────────────────────────────────────────────

jest.mock("../../config/expressMiddleware", () => ({
  configureExpressMiddleware: (app) => {
    const express = require("express");
    const methodOverride = require("method-override");
    app.use(express.static("public"));
    app.set("view engine", "ejs");
    app.use(express.urlencoded({ extended: true }));
    app.use(express.json());
    app.use(methodOverride("_method"));
    app.use((req, res, next) => {
      req.flash = jest.fn().mockReturnValue([]);
      req.isAuthenticated = () => !!req.user;
      next();
    });
  },
}));

jest.mock("../../middleware/auth", () => ({
  requireRole: (role) => (req, res, next) => {
    const header = req.headers["x-test-user"];
    if (!header) return res.status(401).json({ msg: "Unauthorized" });
    const user = JSON.parse(header);
    if (user.role !== role)
      return res.status(403).json({ msg: "Forbidden: Insufficient permissions" });
    req.user = user;
    next();
  },
  requireRoles: (roles) => (req, res, next) => {
    const header = req.headers["x-test-user"];
    if (!header) return res.status(401).json({ msg: "Unauthorized" });
    const user = JSON.parse(header);
    if (!roles.includes(user.role))
      return res.status(403).json({ msg: "Forbidden: Insufficient permissions" });
    req.user = user;
    next();
  },
  isAuthenticated: (req, res, next) => {
    if (!req.user) return res.redirect("/auth/google");
    next();
  },
}));

jest.mock("../../config/database", () => {
  const ItemModel = jest.fn().mockImplementation(() => ({
    save: jest.fn().mockResolvedValue(true),
  }));
  ItemModel.find = jest.fn();
  ItemModel.findById = jest.fn();
  ItemModel.findByIdAndUpdate = jest.fn();
  ItemModel.countDocuments = jest.fn();

  const UserModel = jest.fn().mockImplementation(() => ({
    save: jest.fn().mockResolvedValue(true),
  }));
  UserModel.findById = jest.fn();
  UserModel.find = jest.fn();
  UserModel.countDocuments = jest.fn();

  const LoanModel = jest.fn().mockImplementation(() => ({
    save: jest.fn().mockResolvedValue(true),
  }));
  LoanModel.find = jest.fn();
  LoanModel.findById = jest.fn();
  LoanModel.findOne = jest.fn();
  LoanModel.findOneAndUpdate = jest.fn();
  LoanModel.findOneAndDelete = jest.fn();
  LoanModel.findByIdAndDelete = jest.fn();
  LoanModel.countDocuments = jest.fn();
  LoanModel.create = jest.fn();

  return { ItemModel, UserModel, LoanModel };
});

// ── Test data ──────────────────────────────────────────────────────────────

const validId = new mongoose.Types.ObjectId().toHexString();
const staffUser = JSON.stringify({ _id: validId, role: "staff", cart: [] });

const sampleLoan = {
  _id: validId,
  userId: { _id: validId, name: "Test User", email: "test@umb.edu" },
  itemId: { _id: validId, make: "Sony", model: "A7", assetId: "A001" },
  arrivalTime: new Date(),
  returnTime: new Date(),
  checkedOutAt: new Date(),
};

// ── App ────────────────────────────────────────────────────────────────────

let app;
let LoanModel;
let ItemModel;

beforeAll(() => {
  app = require("../../app");
  ({ LoanModel, ItemModel } = require("../../config/database"));
});

beforeEach(() => {
  jest.clearAllMocks();

  const itemChain = {
    skip: jest.fn().mockReturnThis(),
    limit: jest.fn().mockResolvedValue([]),
  };
  ItemModel.find.mockReturnValue(itemChain);
  ItemModel.countDocuments.mockResolvedValue(0);
  ItemModel.findByIdAndUpdate.mockResolvedValue({ status: "Available" });

  const loanChain = {
    populate: jest.fn().mockReturnThis(),
    sort: jest.fn().mockReturnThis(),
    limit: jest.fn().mockReturnThis(),
    lean: jest.fn().mockResolvedValue([sampleLoan]),
  };
  LoanModel.find.mockReturnValue(loanChain);
  LoanModel.findById.mockResolvedValue(sampleLoan);
  LoanModel.findOne.mockResolvedValue(sampleLoan);
  LoanModel.findOneAndDelete.mockResolvedValue(sampleLoan);
  LoanModel.findByIdAndDelete.mockResolvedValue(sampleLoan);
  LoanModel.countDocuments.mockResolvedValue(1);
  LoanModel.create.mockResolvedValue(sampleLoan);
});

// ── Tests ──────────────────────────────────────────────────────────────────

describe("GET /loaned-items", () => {
  it("returns 401 when not authenticated", async () => {
    const res = await request(app).get("/loaned-items");
    expect(res.status).toBe(401);
  });

  it("returns 200 for staff user", async () => {
    const res = await request(app)
      .get("/loaned-items")
      .set("x-test-user", staffUser);
    expect(res.status).toBe(200);
  });
});

describe("POST /add-loan", () => {
  it("returns 401 when not authenticated", async () => {
    const res = await request(app).post("/add-loan").send({});
    expect(res.status).toBe(401);
  });

  it("returns 400 for invalid userId or itemId", async () => {
    const res = await request(app)
      .post("/add-loan")
      .set("x-test-user", staffUser)
      .send({ userId: "bad-id", itemId: "bad-id", arrivalTime: new Date(), returnTime: new Date() });
    expect(res.status).toBe(400);
  });

  it("returns 400 when times are missing", async () => {
    const res = await request(app)
      .post("/add-loan")
      .set("x-test-user", staffUser)
      .send({ userId: validId, itemId: validId });
    expect(res.status).toBe(400);
  });

  it("returns 201 for a valid loan", async () => {
    const res = await request(app)
      .post("/add-loan")
      .set("x-test-user", staffUser)
      .send({ userId: validId, itemId: validId, arrivalTime: new Date(), returnTime: new Date() });
    expect(res.status).toBe(201);
  });
});

describe("DELETE /delete-loan/:itemId", () => {
  it("returns 401 when not authenticated", async () => {
    const res = await request(app).delete(`/delete-loan/${validId}`);
    expect(res.status).toBe(401);
  });

  it("returns 200 after successful deletion", async () => {
    const res = await request(app)
      .delete(`/delete-loan/${validId}`)
      .set("x-test-user", staffUser);
    expect(res.status).toBe(200);
  });
});

describe("PUT /return-item/:loanId", () => {
  it("returns 401 when not authenticated", async () => {
    const res = await request(app).put(`/return-item/${validId}`);
    expect(res.status).toBe(401);
  });

  it("returns 302 redirect after successful return", async () => {
    const res = await request(app)
      .put(`/return-item/${validId}`)
      .set("x-test-user", staffUser);
    expect(res.status).toBe(302);
    expect(res.headers.location).toBe("/loaned-items");
  });
});
