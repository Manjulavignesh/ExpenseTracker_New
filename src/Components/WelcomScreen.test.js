import { render } from "@testing-library/react";
import WelcomeScreen from "./WelcomeScreen";
describe("welcomescreen component",()=>{
    test("render text welcome to expense tracker",()=>{
        render(<WelcomeScreen/>)
        const outputElement=screen.getByText("welcome",{exact:false});
        expect(outputElement).toBeInTheDocument()
    }),
    test(" renders contact details",()=>{
        render(<WelcomeScreen/>)
        expect(screen.getByRole('link', { name: 'Complete now' })).toHaveAttribute('href', 'http://localhost:3000/profile')
    })
})