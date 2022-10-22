/*
 * @Author: your name
 * @Date: 2022-03-06 12:44:09
 * @LastEditTime: 2022-03-06 13:49:57
 * @LastEditors: your name
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \Polygon-comment-dapp\test\basic.js
 */
const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("Comments", function () {
  it("Should add and fetch successfully", async function () {
    const Comments = await ethers.getContractFactory("Comments");
    const comments = await Comments.deploy();
    await comments.deployed();

    expect(await comments.getComments("my-first-blog-post")).to.be.lengthOf(0);

    const tx1 = await comments.addComment(
      "my-first-blog-post",
      "my first comment"
    );
    await tx1.wait();

    expect(await comments.getComments("my-first-blog-post")).to.be.lengthOf(1);
    expect(await comments.getComments("my-second-blog-post")).to.be.lengthOf(0);

    const tx2 = await comments.addComment(
      "my-second-blog-post",
      "this comment is on a different thread"
    );
    await tx2.wait();

    expect(await comments.getComments("my-first-blog-post")).to.be.lengthOf(1);
    expect(await comments.getComments("my-second-blog-post")).to.be.lengthOf(1);
  });
});
