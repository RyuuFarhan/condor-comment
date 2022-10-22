/*
 * @Author: your name
 * @Date: 2022-03-06 14:18:20
 * @LastEditTime: 2022-03-06 14:18:20
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \comments-with-polygon\hooks\useAddComment.ts
 */
import { useMutation } from "react-query";
import useCommentsContract from "./useCommentsContract";

interface UseAddCommentPayload {
  topic: string;
  message: string;
}

const useAddComment = () => {
  const contract = useCommentsContract();

  return useMutation(async ({ topic, message }: UseAddCommentPayload) => {
    await contract.addComment(topic, message);
  });
};

export default useAddComment;
