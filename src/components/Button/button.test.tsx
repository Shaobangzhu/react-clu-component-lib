import { render, screen, fireEvent } from "@testing-library/react";
import Button, { ButtonProps, ButtonSize, ButtonType } from "./button";

const defaultProps = {
    onClick: jest.fn()
}

const testProps: ButtonProps = {
    btnType: ButtonType.Primary,
    size: ButtonSize.Large,
    className: 'klass'
}

const disabledProps: ButtonProps = {
    disabled: true,
    onClick: jest.fn()
}

describe("test Button component", () => {
  it("should render the correct default button", () => {
    render(<Button {...defaultProps}>Nice</Button>);
    const element = screen.getByText("Nice");

    expect(element).toBeInTheDocument();
    expect(element.tagName).toEqual('BUTTON');
    expect(element).toHaveClass('btn btn-default');

    fireEvent.click(element);
    expect(defaultProps.onClick).toHaveBeenCalled();
  });

  it("should render the correct component based on different props", () => {
    render(<Button {...testProps}>Different Props</Button>);
    const element = screen.getByText("Different Props");

    expect(element).toBeInTheDocument();
    expect(element).toHaveClass('btn-primary btn-lg klass');
  });

  it("should render a link when btnType equals link and href is provided", () => {
    render(<Button btnType={ButtonType.Link} href="http://dummyurl">Link</Button>);
    const element = screen.getByText("Link");

    expect(element).toBeInTheDocument();
    expect(element.tagName).toEqual('A');
    expect(element).toHaveClass('btn btn-link');
  });

  it("should render disabled button when disabled set to true", () => {
    render(<Button {...disabledProps}>Disabled Props</Button>);
    const element = screen.getByText('Disabled Props') as HTMLButtonElement;

    expect(element).toBeInTheDocument();
    expect(element.disabled).toBeTruthy();
    fireEvent.click(element);
    expect(disabledProps.onClick).not.toHaveBeenCalled();
  });
});
