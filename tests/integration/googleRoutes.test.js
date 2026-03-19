const request = require("supertest");

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
  requireRole: () => (req, res, next) => next(),
  requireRoles: () => (req, res, next) => next(),
  isAuthenticated: (req, res, next) => next(),
}));

jest.mock("../../config/database", () => {
  const ItemModel = jest.fn().mockImplementation(() => ({
    save: jest.fn().mockResolvedValue(true),
  }));
  ItemModel.find = jest.fn().mockReturnValue({
    skip: jest.fn().mockReturnThis(),
    limit: jest.fn().mockResolvedValue([]),
  });
  ItemModel.countDocuments = jest.fn().mockResolvedValue(0);

  const UserModel = jest.fn().mockImplementation(() => ({
    save: jest.fn().mockResolvedValue(true),
  }));
  UserModel.findById = jest.fn().mockReturnValue({
    populate: jest.fn().mockResolvedValue({ cart: [] }),
  });
  UserModel.countDocuments = jest.fn().mockResolvedValue(0);

  return {
    ItemModel,
    UserModel,
    LoanModel: { countDocuments: jest.fn().mockResolvedValue(0) },
  };
});

// Mock passport so Google OAuth routes don't try to hit Google
jest.mock("passport", () => ({
  initialize: () => (req, res, next) => next(),
  session: () => (req, res, next) => next(),
  authenticate: () => (req, res, next) => res.redirect("/"),
  use: jest.fn(),
  serializeUser: jest.fn(),
  deserializeUser: jest.fn(),
}));

// ── App ────────────────────────────────────────────────────────────────────

let app;

beforeAll(() => {
  app = require("../../app");
});

// ── Tests ──────────────────────────────────────────────────────────────────

describe("GET /auth/google", () => {
  it("redirects (initiates OAuth flow)", async () => {
    const res = await request(app).get("/auth/google");
    // passport.authenticate returns a redirect in our mock
    expect([301, 302, 303]).toContain(res.status);
  });
});
