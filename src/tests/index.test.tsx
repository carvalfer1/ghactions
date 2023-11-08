// this test case is made using DOM api approach
import App from "../App";
import ReactDOM from "react-dom/client";
import { act } from "react-dom/test-utils";

const wait = (ms: number) => new Promise((r) => setTimeout(r, ms));

let container: any = null;
describe("<App/> test suite:", () => {

  beforeEach(() => {
    container = document.createElement("div");
    container.setAttribute("id", "root");
    document.body.appendChild(container);
  });

  afterEach(() => {
    document.body.removeChild(container);
    container = null;
  });

  describe("Given a default initialization of the app", async () => {

    beforeEach(async ()=>{
        ReactDOM.createRoot(container).render(<App></App>);
        await wait(0);
    });

    it("Application shows up successfully", async () => {
      const mainContainer = container.querySelector('#appContainer')
      expect(mainContainer).toBeTruthy();
    });

    it("Count button works properly", async () => {
        const button = container.querySelector('.card button')
        expect(button.textContent).toEqual("count is 0");
  
        // button.click();   // this is not dispatching the event   
        await act(async () => {
          button.dispatchEvent(new MouseEvent("click", { bubbles: true }));
          return await wait(0);
        });
        expect(button.textContent).toEqual("count is 1");
      });

  });
});
