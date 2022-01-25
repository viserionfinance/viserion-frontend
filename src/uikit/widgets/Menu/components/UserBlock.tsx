import React from "react";
import Button from "../../../components/Button/Button";
import {useWalletModal} from "../../WalletModal";
import {Login} from "../../WalletModal/types";

interface Props {
    account?: string;
    login: Login;
    logout: () => void;
}

const UserBlock: React.FC<Props> = ({account, login, logout}) => {
    const {onPresentConnectModal, onPresentAccountModal} = useWalletModal(login, logout, account);
    const accountEllipsis = account ? `${account.substring(0, 4)}...${account.substring(account.length - 4)}` : null;
    return (
        <div>
            {account ? (
                <Button
                    variant="primary"
                    onClick={() => {
                        onPresentAccountModal();
                    }}
                >
                    {accountEllipsis}
                </Button>
            ) : (
                <Button
                    variant="primary"
                    onClick={() => {
                        onPresentConnectModal();
                    }}
                >
                    Connect
                </Button>
            )}
        </div>
    );
};

export default React.memo(
    UserBlock,
    (prevProps, nextProps) =>
        prevProps.account === nextProps.account &&
        prevProps.login === nextProps.login &&
        prevProps.logout === nextProps.logout
);
