/*
 * @Author: your name
 * @Date: 2022-03-06 14:13:53
 * @LastEditTime: 2022-03-06 14:13:53
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \comments-with-polygon\hooks\useComments.ts
 */
import { useQuery } from "react-query";
import useCommentsContract from "./useCommentsContract";

interface UseCommentsQuery {
  topic: string;
}

const useComments = ({ topic }: UseCommentsQuery) => {
  const contract = useCommentsContract();
  return useQuery(["comments", { topic, chainId: contract.chainId }], () =>
    contract.getComments(topic)
  );
};

export default useComments;
