const request = require("supertest");
const mongoose = require("mongoose");

// ── Mocks ──────────────────────────────────────────────────────────────────

jest.mock("../../config/expressMiddleware", () => ({
  configureExpressMiddleware: (app) => {
    const express = require("express");
    const methodOverride = require("method-override");
    app.use(express.static("public"));
    app.set("view engine", "jsx");
    app.engine("jsx", require("express-react-views").createEngine());
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
const staffUser = JSON.stringify({ _id: validId, role: "staff", cart: [] });

const sampleUser = {
  _id: validId,
  name: "Jane Doe",
  email: "jane@example.com",
  phone: "617-555-0100",
  role: "user",
  disabled: false,
};

// ── App (loaded after mocks) ───────────────────────────────────────────────

let app;
let UserModel;
let ItemModel;

beforeAll(() => {
  app = require("../../app");
  ({ UserModel, ItemModel } = require("../../config/database"));
});

beforeEach(() => {
  jest.clearAllMocks();

  const itemChain = {
    skip: jest.fn().mockReturnThis(),
    limit: jest.fn().mockResolvedValue([]),
    lean: jest.fn().mockResolvedValue([]),
  };
  ItemModel.find.mockReturnValue(itemChain);
  ItemModel.countDocuments.mockResolvedValue(0);

  UserModel.find.mockReturnValue({
    lean: jest.fn().mockResolvedValue([sampleUser]),
  });
  UserModel.findById.mockReturnValue({
    populate: jest.fn().mockResolvedValue({ ...sampleUser, cart: [] }),
    lean: jest.fn().mockResolvedValue(sampleUser),
  });
  UserModel.findOne.mockResolvedValue(null); // no existing user by default
  UserModel.findByIdAndDelete.mockResolvedValue(sampleUser);
  UserModel.countDocuments.mockResolvedValue(1);
});

// ── Tests ──────────────────────────────────────────────────────────────────

describe("POST /users/add", () => {
  it("returns 401 when not authenticated", async () => {
    const res = await request(app)
      .post("/users/add")
      .send({ name: "Bob", email: "bob@example.com", phone: "6175550101", role: "user" });
    expect(res.status).toBe(401);
  });

  it("returns 403 when authenticated as non-admin", async () => {
    const res = await request(app)
      .post("/users/add")
      .set("x-test-user", staffUser)
      .send({ name: "Bob", email: "bob@example.com", phone: "6175550101", role: "user" });
    expect(res.status).toBe(403);
  });

  it("redirects after successfully adding a user as admin", async () => {
    const res = await request(app)
      .post("/users/add")
      .set("x-test-user", adminUser)
      .send({ name: "Bob", email: "bob@example.com", phone: "6175550101", role: "user" });
    expect(res.status).toBe(302);
    expect(res.headers.location).toMatch(/\/admin/);
  });

  it("redirects back to admin when required fields are missing", async () => {
    const res = await request(app)
      .post("/users/add")
      .set("x-test-user", adminUser)
      .send({ name: "Bob" }); // missing email, phone, role
    expect(res.status).toBe(302);
    expect(res.headers.location).toMatch(/\/admin/);
  });
});

describe("DELETE /admin/users/:id", () => {
  it("returns 401 when not authenticated", async () => {
    const res = await request(app).delete(`/admin/users/${validId}`);
    expect(res.status).toBe(401);
  });

  it("redirects after deleting a user as admin", async () => {
    const res = await request(app)
      .delete(`/admin/users/${validId}`)
      .set("x-test-user", adminUser);
    expect(res.status).toBe(302);
    expect(res.headers.location).toMatch(/\/admin/);
  });
});

describe("GET /admin", () => {
  it("returns 401 when not authenticated", async () => {
    const res = await request(app).get("/admin");
    expect(res.status).toBe(401);
  });

  it("returns 200 for admin user", async () => {
    const res = await request(app)
      .get("/admin")
      .set("x-test-user", adminUser);
    expect(res.status).toBe(200);
  });
});
