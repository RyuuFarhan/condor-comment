/*
 * @Author: your name
 * @Date: 2022-03-06 14:19:47
 * @LastEditTime: 2022-03-06 14:19:47
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \comments-with-polygon\components\AuthButton.tsx
 */
import * as React from "react";
import { Button, ButtonProps } from "@chakra-ui/react";
import { useAccount, useConnect } from "wagmi";
import toast from "react-hot-toast";

interface AuthButtonProps extends ButtonProps {}

const AuthButton: React.FunctionComponent<AuthButtonProps> = (props) => {
  const [connectQuery, connect] = useConnect();
  const [accountQuery] = useAccount();

  React.useEffect(() => {
    if (connectQuery.error?.name === "ConnectorNotFoundError") {
      toast.error("MetaMask extension required to sign in");
    }
  }, [connectQuery.error]);

  // If not authenticated, require sign-in
  if (!accountQuery.data?.address) {
    return (
      <Button
        {...props}
        onClick={() => {
          connect(connectQuery.data.connectors[0]);
        }}
      >
        Sign In
      </Button>
    );
  }

  // If authenticated, show button as usual
  return <Button {...props}>{props.children}</Button>;
};

export default AuthButton;
