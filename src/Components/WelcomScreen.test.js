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
    test("renders expenses if succeed",async()=>{
        window.fetch=jest.fn();
        window.fetch.mockResolvedValueOnce({json:async()=>[{id:"p1",title:"expenses"}]})
        render(<WelcomeScreen/>);
        const expenses=await screen.findByAllRole("button");
        expect(expenses).not.toHaveLength(0);
    })
})