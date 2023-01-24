import { useEffect } from 'react';
import ReactDOM from 'react-dom';
import styled from 'styled-components';
import CloseIcon from '@mui/icons-material/Close';
import { TmodalProps } from '../../services/types';

const modalRoot = document.getElementById('modals') as HTMLDivElement;

const Section = styled.div`
  position: relative;
  background-color: #252525;
  width: 434px;
  z-index: 12;
  position: fixed;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
`;

const Header = styled.div`
  position: relative;
  height: 40px;
  background-color: #2a2a2a;
  display: flex;
  align-items: center;
`;

const Button = styled.div`
  margin-left: 13px;
`;

const CloseButton = styled.button`
  all: unset;
  cursor: pointer;
  position: absolute;
  right: 18px;
  margin: 0;
  top: 12px;
`;

const Title = styled.h3`
  margin: 0 0 0 8px;
  font-family: 'Roboto';
  font-style: normal;
  font-weight: 300;
  font-size: 16px;
  line-height: 19px;
  color: #ffffff;
`;

function Modal(props: TmodalProps) {
  const {
    img, heading, handleHide, children,
  } = props;
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === 'Escape') {
        handleHide();
      }
    }

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [handleHide]);

  return ReactDOM.createPortal(
    <Section>
      <Header>
        <Button>{img}</Button>
        <Title>{heading}</Title>
        <CloseButton onClick={handleHide}>
          <CloseIcon
            sx={{ color: '#B7B7B7;', width: '15px', height: '15px' }}
          />
        </CloseButton>
      </Header>
      {children}
    </Section>,
    modalRoot,
  );
}

export default Modal;
