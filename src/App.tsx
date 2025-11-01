import React from 'react';
import Button, {ButtonType, ButtonSize} from './components/Button/button.tsx';

const App: React.FC = () => {

  return (
    <div className='App'>
      <header className='App-header'>
        <Button> This is a basic Button </Button>
        <Button disabled> disabled </Button>
        <Button btnType={ButtonType.Primary} size={ButtonSize.Large}> This is a Primary & Large Button </Button>
        <Button btnType={ButtonType.Link} href="https://www.extron.com/"> Extron Link Button </Button>
      </header>
    </div>
  );
};

export default App;