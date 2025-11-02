import React from 'react';
import Button, {ButtonType, ButtonSize} from './components/Button/button.tsx';

const App: React.FC = () => {

  return (
    <div className='App'>
      <header className='App-header'>
        <Button onClick={(e) => {e.preventDefault(); alert("Happy Halloween!")}}>Test onClick</Button>
        <Button autoFocus> This is a basic Button </Button>
        <Button disabled> disabled </Button>
        <Button btnType={ButtonType.Primary} size={ButtonSize.Large}> This is a Primary & Large Button </Button>
        <Button btnType={ButtonType.Danger} size={ButtonSize.Small}> This is a Danger & Small Button </Button>
        <Button btnType={ButtonType.Link} href="https://www.extron.com/" target="_blank"> Extron Link Button </Button>
      </header>
    </div>
  );
};

export default App;