/*
 * @Author: your name
 * @Date: 2022-03-06 14:28:22
 * @LastEditTime: 2022-03-06 14:28:23
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \comments-with-polygon\hooks\useEvents.ts
 */
import { useEffect } from "react";
import { useQueryClient } from "react-query";
import useCommentsContract, { EventType } from "./useCommentsContract";

interface UseEventsQuery {
  topic: string;
}

// Listen to events and refresh data
const useEvents = ({ topic }: UseEventsQuery) => {
  const queryClient = useQueryClient();
  const commentsContract = useCommentsContract();

  useEffect(() => {
    const handler = (comment) => {
      if (comment.topic !== topic) {
        return;
      }
      // Invalidates the query whose query key matches the passed array.
      // This will cause the useComments hook to re-render the Comments
      // component with fresh data.
      queryClient.invalidateQueries([
        "comments",
        { topic: comment.topic, chainId: commentsContract.chainId },
      ]);
    };

    commentsContract.contract.on(EventType.CommentAdded, handler);

    return () => {
      commentsContract.contract.off(EventType.CommentAdded, handler);
    };
  }, [queryClient, commentsContract.chainId, topic]);
};

export default useEvents;
