/*
 * @Author: your name
 * @Date: 2022-03-06 14:14:25
 * @LastEditTime: 2022-03-06 14:28:48
 * @LastEditors: your name
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \comments-with-polygon\components\Comments.tsx
 */
import * as React from "react";
import { Box, Spinner, Stack, Center } from "@chakra-ui/react";
import Comment from "./Comment";
import CommentEditor from "./CommentEditor";
import useComments from "../hooks/useComments";
import useEvents from "../hooks/useEvents";

interface CommentsProps {
  topic: string;
}

const Comments: React.FunctionComponent<CommentsProps> = ({ topic }) => {
  const query = useComments({ topic });

  useEvents({ topic });

  return (
    <Box>
      {query.isLoading && (
        <Center p={8}>
          <Spinner />
        </Center>
      )}
      <Stack spacing={4}>
        {query.data?.map((comment) => (
          <Comment key={comment.id} comment={comment} />
        ))}
        {query.isFetched && <CommentEditor topic={topic} />}
      </Stack>
    </Box>
  );
};

export default Comments;
