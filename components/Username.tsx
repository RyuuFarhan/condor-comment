/*
 * @Author: your name
 * @Date: 2022-03-06 14:29:08
 * @LastEditTime: 2022-03-06 14:29:09
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \comments-with-polygon\components\Username.tsx
 */
import * as React from "react";
import { Text, TextProps } from "@chakra-ui/react";
import { useEnsLookup } from "wagmi";
import truncateMiddle from "truncate-middle";

interface UsernameProps extends TextProps {
  address: string;
}

const Username: React.FunctionComponent<UsernameProps> = ({
  address,
  ...otherProps
}) => {
  const [query] = useEnsLookup({ address });

  // Show ens name if exists, but show truncated address as fallback
  return (
    <Text
      display="inline"
      textTransform={query.data ? "none" : "uppercase"}
      {...otherProps}
    >
      {query.data || truncateMiddle(address || "", 5, 4, "...")}
    </Text>
  );
};

export default Username;
