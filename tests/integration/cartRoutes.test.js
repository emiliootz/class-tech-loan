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
  ItemModel.countDocuments = jest.fn();

  const UserModel = jest.fn().mockImplementation(() => ({
    save: jest.fn().mockResolvedValue(true),
  }));
  UserModel.findById = jest.fn();
  UserModel.find = jest.fn();
  UserModel.findByIdAndUpdate = jest.fn();
  UserModel.countDocuments = jest.fn();

  const LoanModel = jest.fn().mockImplementation(() => ({
    save: jest.fn().mockResolvedValue(true),
  }));
  LoanModel.countDocuments = jest.fn().mockResolvedValue(0);
  LoanModel.create = jest.fn().mockResolvedValue(true);

  return { ItemModel, UserModel, LoanModel };
});

// ── Test data ──────────────────────────────────────────────────────────────

const validId = new mongoose.Types.ObjectId().toHexString();
const loggedInUser = JSON.stringify({ _id: validId, role: "user", cart: [] });

// ── App ────────────────────────────────────────────────────────────────────

let app;
let ItemModel;
let UserModel;

beforeAll(() => {
  app = require("../../app");
  ({ ItemModel, UserModel } = require("../../config/database"));
});

beforeEach(() => {
  jest.clearAllMocks();

  const itemChain = {
    skip: jest.fn().mockReturnThis(),
    limit: jest.fn().mockResolvedValue([]),
    lean: jest.fn().mockResolvedValue([]),
  };
  ItemModel.find.mockReturnValue(itemChain);
  ItemModel.findById.mockResolvedValue(null);
  ItemModel.countDocuments.mockResolvedValue(0);

  UserModel.findById.mockReturnValue({
    populate: jest.fn().mockResolvedValue({ _id: validId, role: "user", cart: [] }),
    lean: jest.fn().mockResolvedValue({ _id: validId, role: "user", cart: [] }),
  });
  UserModel.findByIdAndUpdate.mockResolvedValue({ _id: validId, role: "user", cart: [validId] });
});

// ── Tests ──────────────────────────────────────────────────────────────────

// Cart routes use isAuthenticated which redirects to /auth/google (302)
describe("POST /add-to-cart/:itemId", () => {
  it("redirects unauthenticated users to login", async () => {
    const res = await request(app).post(`/add-to-cart/${validId}`);
    expect(res.status).toBe(302);
    expect(res.headers.location).toMatch(/auth\/google/);
  });
});

describe("DELETE /remove-from-cart/:itemId", () => {
  it("redirects unauthenticated users to login", async () => {
    const res = await request(app).delete(`/remove-from-cart/${validId}`);
    expect(res.status).toBe(302);
    expect(res.headers.location).toMatch(/auth\/google/);
  });
});

describe("POST /checkout-cart", () => {
  it("redirects unauthenticated users to login", async () => {
    const res = await request(app).post("/checkout-cart").send({});
    expect(res.status).toBe(302);
    expect(res.headers.location).toMatch(/auth\/google/);
  });
});
