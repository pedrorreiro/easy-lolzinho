import * as Config from "../../config";
import { LolzinhoError } from "../../errors/LolzinhoError";
import { RequireInit } from "../RequireInit";

describe("RequireInit", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });
  it("should throw an error if the client is not initialized", () => {
    class TestClass {
      @RequireInit()
      testMethod() {
        throw new LolzinhoError(
          "Lolzinho client must be initialized before use"
        );
      }
    }

    const instance = new TestClass();

    expect(() => instance.testMethod()).toThrow(LolzinhoError);
  });

  it("should not throw an error if the client is initialized", () => {
    class TestClass {
      @RequireInit()
      testMethod() {
        return "Test";
      }
    }

    jest.spyOn(Config, "checkConfig").mockReturnValue(true);

    const instance = new TestClass();
    expect(instance.testMethod()).toBe("Test");
    expect(() => instance.testMethod()).not.toThrow(LolzinhoError);
  });
});
