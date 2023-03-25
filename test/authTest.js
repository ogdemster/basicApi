import chai from "chai";
import chaiHttp from "chai-http";

chai.use(chaiHttp);
const expect = chai.expect;

describe("POST /login", () => {
  it("Should return a token when the correct credentials provided", (done) => {
    chai
      .request("http://127.0.0.1:9000/auth")
      .post("/")
      .send({ name: "admin1", password: "admin1" })
      .end((err, res) => {
        expect(err).to.be.null;
        expect(res).to.have.status(200);
        expect(res.header).to.have.property("auth-token");
        done();
      });
  });
  it("should return an error when incorrect credentials are provided", (done) => {
    chai
      .request("http://127.0.0.1:9000/auth")
      .post("/")
      .send({ name: "foospecial", password: "barspecial" })
      .end((err, res) => {
        expect(err).to.be.null;
        expect(res).to.have.status(400);
        expect(res.text).to.equal("User not found");
        done();
      });
  });

  it("Should register new user successfully", (done) => {
    chai
      .request("http://127.0.0.1:9000/auth/newuser")
      .post("/")
      .send({ name: "admin221", password: "admin221" })
      .end((err, res) => {
        expect(err).to.be.null;
        expect(res).to.have.status(200);
        expect(res.body).to.deep.equal({ message: "User successfully added!" });
        done();
      });
  });
});
