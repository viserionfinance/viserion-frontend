import React from 'react'
import {Modal} from 'antd';

const ModalPreSale: any = ({setIsOpen, isOpen}: any) => {
    const Join = () => {
        // eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-static-element-interactions
        return <div className="join"
                    onClick={() => window.open("")}/>
    }
    return <>
        <Modal
            title=""
            centered
            visible={isOpen}
            onOk={() => setIsOpen(false)}
            onCancel={() => setIsOpen(false)}
            className="whitelist"
            footer={false}
        >
            <Join/>
        </Modal>
    </>
}
export default ModalPreSale
