import React from 'react';

class Modal extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            open: false
        }

        this.closeModal = this.closeModal.bind(this);
    }

    closeModal() {
        this.props.closeModal();
    }

    render() {
        const {title, message} = this.props;
        return (
            <section className="modalWrap">
                <div className="modalInner">
                    <button className="close" onClick={this.closeModal}></button>
                    <h3>{title}</h3>
                    <p>{message}</p>
                </div>
            </section>
        );
    }
}

export default Modal;
