const request = require("supertest");
const mongoose = require("mongoose");

// ── Mocks ──────────────────────────────────────────────────────────────────

// Lightweight middleware: no MongoStore, no Passport, no Google OAuth
jest.mock("../../config/expressMiddleware", () => ({
  configureExpressMiddleware: (app) => {
    const express = require("express");
    const methodOverride = require("method-override");
    app.use(express.static("public"));
    app.set("view engine", "ejs");
    app.use(express.urlencoded({ extended: true }));
    app.use(express.json());
    app.use(methodOverride("_method"));
    // Stub passport/session helpers used in controllers
    app.use((req, res, next) => {
      req.flash = () => [];
      req.isAuthenticated = () => !!req.user;
      next();
    });
  },
}));

// Auth middleware — uses x-test-user header to inject a test user
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

// Database models — all methods are jest stubs
jest.mock("../../config/database", () => {
  const ItemModel = jest.fn().mockImplementation(() => ({
    save: jest.fn().mockResolvedValue(true),
  }));
  ItemModel.find = jest.fn();
  ItemModel.findById = jest.fn();
  ItemModel.findByIdAndDelete = jest.fn();
  ItemModel.findOneAndUpdate = jest.fn();
  ItemModel.countDocuments = jest.fn();

  const UserModel = jest.fn().mockImplementation(() => ({
    save: jest.fn().mockResolvedValue(true),
  }));
  UserModel.findById = jest.fn();
  UserModel.find = jest.fn();
  UserModel.findOne = jest.fn();
  UserModel.findByIdAndUpdate = jest.fn();
  UserModel.findByIdAndDelete = jest.fn();
  UserModel.countDocuments = jest.fn();

  return {
    ItemModel,
    UserModel,
    LoanModel: { countDocuments: jest.fn().mockResolvedValue(0) },
  };
});

// ── Test data ──────────────────────────────────────────────────────────────

const validId = new mongoose.Types.ObjectId().toHexString();
const adminUser = JSON.stringify({ _id: validId, role: "admin", cart: [] });

const sampleItem = {
  _id: validId,
  assetId: "CAM001",
  assetType: "Video",
  make: "Sony",
  model: "A7III",
  status: "Available",
  picture: "/images/placeholder.jpg",
};

// ── App (loaded after mocks are registered) ────────────────────────────────

let app;
let ItemModel;

beforeAll(() => {
  app = require("../../app");
  ({ ItemModel } = require("../../config/database"));
});

beforeEach(() => {
  jest.clearAllMocks();

  // Default stubs for home route (app.js uses chained find)
  const chainable = {
    skip: jest.fn().mockReturnThis(),
    limit: jest.fn().mockResolvedValue([sampleItem]),
    lean: jest.fn().mockResolvedValue([sampleItem]),
  };
  ItemModel.find.mockReturnValue(chainable);
  ItemModel.countDocuments.mockResolvedValue(1);
  ItemModel.findById.mockResolvedValue(sampleItem);
  ItemModel.findByIdAndDelete.mockResolvedValue(sampleItem);
});

// ── Tests ──────────────────────────────────────────────────────────────────

describe("GET /items", () => {
  it("returns a JSON array of items", async () => {
    ItemModel.find.mockResolvedValue([sampleItem]);

    const res = await request(app).get("/items");

    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });
});

describe("GET /item/:itemId", () => {
  it("returns 200 for a valid existing item", async () => {
    const res = await request(app).get(`/item/${validId}`);
    expect(res.status).toBe(200);
  });

  it("returns 400 for an invalid ObjectId", async () => {
    const res = await request(app).get("/item/not-a-valid-id");
    expect(res.status).toBe(400);
  });

  it("returns 404 when item does not exist", async () => {
    ItemModel.findById.mockResolvedValue(null);
    const res = await request(app).get(`/item/${validId}`);
    expect(res.status).toBe(404);
  });
});

describe("POST /add-item", () => {
  it("returns 401 when not authenticated", async () => {
    const res = await request(app)
      .post("/add-item")
      .send({ assetId: "X1", assetType: "Video", make: "Sony", model: "A1", status: "Available" });
    expect(res.status).toBe(401);
  });

  it("returns 403 when authenticated as a non-admin", async () => {
    const user = JSON.stringify({ _id: validId, role: "user", cart: [] });
    const res = await request(app)
      .post("/add-item")
      .set("x-test-user", user)
      .send({ assetId: "X1", assetType: "Video", make: "Sony", model: "A1", status: "Available" });
    expect(res.status).toBe(403);
  });

  it("redirects to /admin on success when authenticated as admin", async () => {
    const res = await request(app)
      .post("/add-item")
      .set("x-test-user", adminUser)
      .send({ assetId: "X1", assetType: "Video", make: "Sony", model: "A1", status: "Available" });
    expect(res.status).toBe(302);
    expect(res.headers.location).toMatch(/\/admin/);
  });
});

describe("DELETE /delete-item/:id", () => {
  it("returns 401 when not authenticated", async () => {
    const res = await request(app).delete(`/delete-item/${validId}`);
    expect(res.status).toBe(401);
  });

  it("redirects to /admin after successful deletion", async () => {
    const res = await request(app)
      .delete(`/delete-item/${validId}`)
      .set("x-test-user", adminUser);
    expect(res.status).toBe(302);
    expect(res.headers.location).toMatch(/\/admin/);
  });

  it("returns 400 for an invalid ObjectId", async () => {
    const res = await request(app)
      .delete("/delete-item/bad-id")
      .set("x-test-user", adminUser);
    expect(res.status).toBe(400);
  });
});
