import { render } from "@testing-library/react";
import WelcomeScreen from "./WelcomeScreen";
describe("welcomescreen component",()=>{
    test("render text welcome to expense tracker",()=>{
        render(<WelcomeScreen/>)
        const outputElement=screen.getByText("welcome",{exact:false});
        expect(outputElement).toBeInTheDocument()
    })
})