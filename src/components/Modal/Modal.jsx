import { useEffect } from 'react';
import { createPortal } from 'react-dom';

const modalRoot = document.querySelector('#modal-root');

export const Modal = ({ onClose, modalImage }) => {
  useEffect(() => {
    function handleKeyDown(event) {
      if (event.code === 'Escape') {
        onClose();
      }
      window.removeEventListener('keydown', handleKeyDown);
    }
    window.addEventListener('keydown', handleKeyDown);
  }, [onClose]);

  const handleBackdropClick = e => {
    if (e.currentTarget === e.target) {
      onClose();
    }
  };

  return createPortal(
    <div className="Overlay" onClick={handleBackdropClick}>
      <div className="Modal">{modalImage}</div>
    </div>,
    modalRoot
  );
};

// export class Modal extends Component {
//   componentDidMount() {
//     window.addEventListener('keydown', this.handleKeyDown);
//   }
//   componentWillUnmount() {
//     window.removeEventListener('keydown', this.handleKeyDown);
//   }

//   handleBackdropClick = e => {
//     if (e.currentTarget === e.target) {
//       this.props.onClose();
//     }
//   };

//   handleKeyDown = event => {
//     if (event.code === 'Escape') {
//       this.props.onClose();
//     }
//   };
//   render() {
//     return createPortal(
//       <div className="Overlay" onClick={this.handleBackdropClick}>
//         <div className="Modal">{this.props.children}</div>
//       </div>,
//       modalRoot
//     );
//   }
// }
