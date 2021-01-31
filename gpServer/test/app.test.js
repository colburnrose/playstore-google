const supertest = require("supertest");
const app = require("./../app");
const { expect } = require("chai");

// GET: test getListOfApps
// Determine the array contains app objects
describe("GET /apps", () => {
  it("should return an array of apps", () => {
    return supertest(app)
      .get("/apps")
      .expect(200)
      .expect("Content-Type", /json/)
      .then((res) => {
        expect(res.body).to.be.an("array");
        expect(res.body).to.have.lengthOf.at.least(1);
        const app = res.body[0];
        expect(app).to.include.all.keys(
          "Android Ver",
          "App",
          "Category",
          "Content Rating",
          "Current Ver",
          "Genres",
          "Installs",
          "Last Updated",
          "Price",
          "Rating",
          "Reviews",
          "Size",
          "Type"
        );
      });
  });

  it("should sort by app", () => {
    return supertest(app)
      .get("/apps")
      .query({ sort: "app" })
      .expect(200)
      .expect("Content-Type", /json/)
      .then((res) => {
        expect(res.body).to.be.an("array");
        let sorted = true;

        let i = 0;

        // iterate once less than the length of the array
        // because we're comparing 2 items in the array at a time
        while (i < res.body.length - 1) {
          // compare book at `i` with next book at `i + 1`
          const appAtI = res.body[i];
          const appAtIPlus1 = res.body[i + 1];
          // if the next book is less than the book at i,
          if (appAtIPlus1.app < appAtI.app) {
            // the books were not sorted correctly
            sorted = false;
            break; // exit the loop
          }
          i++;
        }
        expect(sorted).to.be.true;
      });
  });

  it("should sort by rating", () => {
    return supertest(app)
      .get("/apps")
      .query({ sort: "rating" })
      .expect(200)
      .expect("Content-Type", /json/)
      .then((res) => {
        expect(res.body).to.be.an("array");
        let sorted = true;

        let i = 0;

        // iterate once less than the length of the array
        // because we're comparing 2 items in the array at a time
        while (i < res.body.length - 1) {
          // compare book at `i` with next book at `i + 1`
          const appAtI = res.body[i];
          const appAtIPlus1 = res.body[i + 1];
          // if the next book is less than the book at i,
          if (appAtIPlus1.rating < appAtI.rating) {
            // the books were not sorted correctly
            sorted = false;
            break; // exit the loop
          }
          i++;
        }
        expect(sorted).to.be.true;
      });
  });
});
