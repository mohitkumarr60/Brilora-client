import CoursePlayer from "@/app/utils/CoursePlayer";
import {
  useAddAnswerInQuestionMutation,
  useAddNewQuestionMutation,
  useAddReplyMutation,
  useAddReviewMutation,
  useGetCourseDetailsQuery,
} from "@/redux/features/courses/coursesApi";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import {
  AiFillStar,
  AiOutlineArrowLeft,
  AiOutlineArrowRight,
  AiOutlineStar,
} from "react-icons/ai";
import toast from "react-hot-toast";
import { format } from "timeago.js";
import { BiMessage } from "react-icons/bi";
import { VscVerifiedFilled } from "react-icons/vsc";
import LoadingButton from "../loadingButton";
import Ratings from "@/app/utils/Ratings";

type Props = {
  data: any;
  id: string;
  activeVideo: number;
  setActiveVideo: (activeVideo: number) => void;
  user: any;
  refetch: any;
};

const CourseContentMedia = ({
  data,
  id,
  user,
  activeVideo,
  setActiveVideo,
  refetch,
}: Props) => {
  const [answer, setAnswer] = useState("");
  const [activeBar, setActiveBar] = useState(0);
  const [question, setQuestion] = useState("");
  const [review, setReview] = useState("");
  const [rating, setRating] = useState(1);
  const [questionId, setQuestionId] = useState("");
  const [reply, setReply] = useState("");
  const [reviewId, setReviewId] = useState("");
  const [isReviewReply, setIsReviewReply] = useState(false);

  const { data: courseData, refetch: courseRefetch } =
    useGetCourseDetailsQuery(id);
  const [
    addReply,
    {
      isSuccess: replySuccess,
      error: replyError,
      isLoading: replyCreationLoading,
    },
  ] = useAddReplyMutation({});
  const [
    addReview,
    {
      isSuccess: reviewSuccess,
      error: reviewError,
      isLoading: reviewCreationLoading,
    },
  ] = useAddReviewMutation();
  const [
    addNewQuestion,
    { isSuccess, error, isLoading: questionCreationLoading },
  ] = useAddNewQuestionMutation();
  const [
    addAnswerInQuestion,
    {
      isSuccess: answerSuccess,
      error: answerError,
      isLoading: answerCreationLoading,
    },
  ] = useAddAnswerInQuestionMutation();

  const course = courseData?.course;

  const isReviewExist = course?.reviews?.find(
    (item: any) => item.user._id === user._id
  );

  const handleQuestion = () => {
    if (question.length === 0) {
      toast.error("Question is required");
    } else {
      addNewQuestion({
        question,
        courseId: id,
        contentId: data[activeVideo]._id,
      });
    }
  };

  const handleAnswerSubmit = () => {
    addAnswerInQuestion({
      answer,
      courseId: id,
      contentId: data[activeVideo]._id,
      questionId: questionId,
    });
  };

  const handleReviewSubmit = async () => {
    if (review.length === 0) {
      toast.error("Review is required");
    } else {
      addReview({
        review,
        rating,
        courseId: id,
      });
    }
  };

  const handleReviewReplySubmit = () => {
    if (!replyCreationLoading) {
      if (reply === "") {
        toast.error("Reply is required");
      } else {
        addReply({ comment: reply, courseId: id, reviewId });
      }
    }
  };

  useEffect(() => {
    if (isSuccess) {
      setQuestion("");
      refetch();
      toast.success("Question added successfully");
    }
    if (error) {
      if ("data" in error) {
        const errorMessage = error as any;
        toast.error(errorMessage.data.message);
      }
    }
    if (answerSuccess) {
      setAnswer("");
      refetch();
      toast.success("Answer added successfully");
    }
    if (answerError) {
      if ("data" in answerError) {
        const errorMessage = answerError as any;
        toast.error(errorMessage.data.message);
      }
    }
    if (reviewSuccess) {
      setReview("");
      setRating(1);
      courseRefetch();
      toast.success("Review added successfully");
    }
    if (reviewError) {
      if ("data" in reviewError) {
        const errorMessage = reviewError as any;
        toast.error(errorMessage.data.message);
      }
    }
    if (replySuccess) {
      setReply("");
      refetch();
      toast.success("Reply added successfully");
    }
    if (replyError) {
      if ("data" in replyError) {
        const errorMessage = replyError as any;
        toast.error(errorMessage.data.message);
      }
    }
  }, [
    answerError,
    answerSuccess,
    courseRefetch,
    error,
    isSuccess,
    refetch,
    replyError,
    replySuccess,
    reviewError,
    reviewSuccess,
  ]);

  return (
    <div className="p-4 m-auto bg-white border-x shadow-sm">
      <CoursePlayer
        title={data[activeVideo]?.title}
        videoUrl={data[activeVideo]?.videoUrl}
      />
      <div className="w-full flex items-center justify-between my-3">
        {activeVideo !== 0 ? (
          <div
            className="bg-purple-500 hover:bg-purple-600 px-4 py-2 rounded-full flex font-Poppins text-white items-center cursor-pointer gap-2 hover:gap-3 hover:pl-[12px]"
            onClick={() =>
              setActiveVideo(activeVideo === 0 ? 0 : activeVideo - 1)
            }
          >
            <AiOutlineArrowLeft size={20} />
          </div>
        ) : (
          <div></div>
        )}
        {data && data.length - 1 !== activeVideo && (
          <div
            className="bg-purple-500 hover:bg-purple-600 px-4 py-2 rounded-full flex font-Poppins text-white items-center cursor-pointer gap-2 hover:gap-3 hover:pr-[12px]"
            onClick={() =>
              setActiveVideo(
                data && data.length - 1 === activeVideo
                  ? activeVideo
                  : activeVideo + 1
              )
            }
          >
            <AiOutlineArrowRight size={20} />
          </div>
        )}
      </div>
      <h1 className="pt-2 text-2xl font-semibold">{data[activeVideo].title}</h1>
      <br />
      <div className="w-full flex items-center gap-8 font-bold text-neutral-500 border-b transition-all duration-200">
        {["Overview", "Resources", "Q&A", "Reviews"].map((text, index) => (
          <h5
            key={index}
            className={`cursor-pointer ${
              activeBar === index &&
              "text-black py-3 border-b-[3px] border-purple-600"
            }`}
            onClick={() => setActiveBar(index)}
          >
            {text}
          </h5>
        ))}
      </div>
      <br />
      {activeBar === 0 && (
        <p className="whitespace-pre-line mb-3">
          {data[activeVideo]?.description}
        </p>
      )}
      {activeBar === 1 && (
        <div>
          {data[activeVideo]?.links.map((item: any, index: number) => (
            // eslint-disable-next-line react/jsx-key
            <div className="mb-5">
              <h2 className="md:inline-block text-black">
                {item.title && item.title + " :"}
              </h2>
              <a
                href={item.url}
                className="inline-block md:pl-2 text-purple-600"
              >
                {item.url}
              </a>
            </div>
          ))}
        </div>
      )}
      {activeBar === 2 && (
        <>
          <div className="flex w-full mb-2">
            <Image
              src={
                user.avatar
                  ? user.avatar.url
                  : "/assets/avatar.webp"
              }
              width={50}
              height={50}
              alt="avatar"
              className="rounded-full w-[50px] h-[50px] object-cover border"
            />
            <textarea
              name=""
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              id=""
              cols={30}
              rows={5}
              placeholder="Write your question..."
              className="outline-none bg-transparent border md:w-full p-2 rounded flex-1 ml-2 h-[100px] resize-none"
            ></textarea>
          </div>
          <div className="flex justify-end">
            {questionCreationLoading ? (
              <LoadingButton />
            ) : (
              <button
                className="px-3 py-2 bg-purple-500 hover:bg-purple-600 text-white rounded-sm"
                onClick={questionCreationLoading ? () => {} : handleQuestion}
              >
                Add Question
              </button>
            )}
          </div>
          <br />
          <div>
            <CommentReply
              data={data}
              activeVideo={activeVideo}
              answer={answer}
              setAnswer={setAnswer}
              handleAnswerSubmit={handleAnswerSubmit}
              user={user}
              setQuestionId={setQuestionId}
              answerCreationLoading={answerCreationLoading}
            />
          </div>
        </>
      )}
      {activeBar === 3 && (
        <>
          {!isReviewExist && (
            <div>
              <div className="flex">
                <Image
                  src={
                    user.avatar
                      ? user.avatar.url
                      : "/assets/avatar.webp"
                  }
                  width={50}
                  height={50}
                  alt="avatar"
                  className="rounded-full w-[50px] h-[50px] object-cover border"
                />
                <div className="ml-3 w-full">
                  <h5 className="text-lg font-medium mb-1">
                    How would you rate this course?
                  </h5>
                  <div className="flex w-full pb-3">
                    {[1, 2, 3, 4, 5].map((i) =>
                      rating >= i ? (
                        <AiFillStar
                          key={i}
                          size={22}
                          className="text-yellow-500 cursor-pointer"
                          onClick={() => setRating(i)}
                        />
                      ) : (
                        <AiOutlineStar
                          key={i}
                          size={22}
                          className="text-yellow-500 cursor-pointer"
                          onClick={() => setRating(i)}
                        />
                      )
                    )}
                  </div>
                  <textarea
                    name=""
                    value={review}
                    onChange={(e) => setReview(e.target.value)}
                    id=""
                    cols={30}
                    rows={5}
                    placeholder="Write a review..."
                    className="outline-none bg-transparent border md:w-full p-2 rounded w-[90%]"
                  ></textarea>
                </div>
              </div>
              <br />
              <div className="flex justify-end">
                {reviewCreationLoading ? (
                  <LoadingButton />
                ) : (
                  <button
                    className="px-3 py-2 bg-purple-500 hover:bg-purple-600 text-white rounded-sm"
                    onClick={
                      reviewCreationLoading ? () => {} : handleReviewSubmit
                    }
                  >
                    Submit
                  </button>
                )}
              </div>
            </div>
          )}
          <div className="w-full">
            {(course?.reviews && [...course.reviews].reverse())?.map(
              (item: any, index: number) => (
                <div className="w-full my-5" key={index}>
                  <div className="w-full flex">
                    <div>
                      {item.user.avatar ? (
                        <Image
                          src={item.user.avatar.url}
                          width={50}
                          height={50}
                          alt="avatar"
                          className="rounded-full w-[50px] h-[50px] object-cover"
                        />
                      ) : (
                        <div className="w-[50px] h-[50px] flex items-center justify-center text-lg bg-gray-300 rounded-full">
                          {item.user.name.slice(0, 2)}
                        </div>
                      )}
                    </div>
                    <div className="ml-2 w-full flex-1">
                      <h1 className="text-lg font-medium">{item?.user.name}</h1>
                      <Ratings rating={item.rating} />
                      <p className="mt-1">{item.comment}</p>
                      <small className="text-slate-500">
                        {format(item?.createdAt)}

                        {user.role === "admin" &&
                          item.commentReplies.length === 0 && (
                            <span
                              className="pl-3 hover:text-black cursor-pointer"
                              onClick={() => {
                                setIsReviewReply(true);
                                setReviewId(item._id);
                              }}
                            >
                              Add Reply
                            </span>
                          )}
                      </small>
                      <br />
                      {isReviewReply && reviewId === item._id && (
                        <div className="relative">
                          <input
                            type="text"
                            name=""
                            id=""
                            value={reply}
                            onChange={(e) => setReply(e.target.value)}
                            placeholder="write a reply..."
                            className="border-b-2 border-slate-300 w-full focus:outline-none mt-3 py-1"
                          />
                          <button
                            type="submit"
                            className="absolute text-sm right-0 bottom-0 py-2"
                            onClick={handleReviewReplySubmit}
                          >
                            Submit
                          </button>
                        </div>
                      )}
                      {item.commentReplies.map((i: any, index: number) => (
                        <div className="w-full flex my-5" key={index}>
                          <div>
                            {i.user.avatar ? (
                              <Image
                                src={i.user.avatar.url}
                                width={50}
                                height={50}
                                alt="avatar"
                                className="rounded-full w-[50px] h-[50px] object-cover"
                              />
                            ) : (
                              <div className="w-[50px] h-[50px] flex items-center justify-center text-lg bg-gray-300 rounded-full">
                                {i.user.name.slice(0, 2)}
                              </div>
                            )}
                          </div>
                          <div className="pl-2">
                            <div className="flex items-center">
                              <h5 className="text-lg font-medium">
                                {i.user.name}
                              </h5>
                              <VscVerifiedFilled className="text-purple-600 size-5 ml-1" />
                            </div>
                            <p className="text-base">{i.comment}</p>
                            <small className="text-gray-500">
                              {format(i.createdAt)}
                            </small>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )
            )}
          </div>
        </>
      )}
    </div>
  );
};

const CommentReply = ({
  data,
  activeVideo,
  answer,
  setAnswer,
  handleAnswerSubmit,
  user,
  setQuestionId,
  answerCreationLoading,
}: any) => {
  return (
    <>
      <div className="w-full my-3">
        {data[activeVideo].questions.map((item: any, index: any) => (
          <CommentItem
            key={index}
            data={data}
            activeVideo={activeVideo}
            item={item}
            index={index}
            answer={answer}
            setAnswer={setAnswer}
            setQuestionId={setQuestionId}
            handleAnswerSubmit={handleAnswerSubmit}
            answerCreationLoading={answerCreationLoading}
          />
        ))}
      </div>
    </>
  );
};

const CommentItem = ({
  item,
  data,
  answer,
  setAnswer,
  questionId,
  setQuestionId,
  handleAnswerSubmit,
  answerCreationLoading,
}: any) => {
  const [replyActive, setReplyActive] = useState(false);

  return (
    <>
      <div className="my-4">
        <div className="flex mb-2">
          <div>
            {item.user.avatar ? (
              <Image
                src={item.user.avatar.url}
                width={50}
                height={50}
                alt="avatar"
                className="rounded-full w-[50px] h-[50px] object-cover"
              />
            ) : (
              <div className="w-[50px] h-[50px] flex items-center justify-center text-lg bg-gray-300 rounded-full">
                {item.user.name.slice(0, 2)}
              </div>
            )}
          </div>
          <div className="pl-3">
            <h5 className="text-lg font-medium">{item?.user.name}</h5>
            <p className="text-base">{item?.question}</p>
            <small className="text-gray-500">
              {!item.createdAt ? "" : format(item?.createdAt)}{" "}
            </small>
          </div>
        </div>
        <div className="w-full flex">
          <span
            className="md:pl-16 cursor-pointer text-sm mr-2"
            onClick={() => {
              setReplyActive(!replyActive);
              setQuestionId(item._id);
            }}
          >
            {!replyActive
              ? item.questionReplies.length !== 0
                ? "All Replies"
                : "Add Reply"
              : "Hide Replies"}
          </span>
          <BiMessage size={25} className="cursor-pointer text-black p-1" />
          <span className="pl-1 cursor-pointer text-sm">
            {item.questionReplies.length}
          </span>
        </div>
        {replyActive && questionId === item._id && (
          <>
            {item.questionReplies.map((item: any) => (
              <div className="w-full flex md:ml-16 my-5" key={item}>
                <div>
                  {item.user.avatar ? (
                    <Image
                      src={item.user.avatar.url}
                      width={50}
                      height={50}
                      alt="avatar"
                      className="rounded-full w-[50px] h-[50px] object-cover"
                    />
                  ) : (
                    <div className="w-[50px] h-[50px] flex items-center justify-center text-lg bg-gray-300 rounded-full">
                      {item.user.name.slice(0, 2)}
                    </div>
                  )}
                </div>
                <div className="pl-2">
                  <div className="flex items-center">
                    <h5 className="text-lg font-medium">{item.user.name}</h5>
                    {item.user.role === "admin" && (
                      <VscVerifiedFilled className="text-purple-600 size-5 ml-1" />
                    )}
                  </div>
                  <p className="text-base">{item.answer}</p>
                  <small className="text-gray-500">
                    {format(item.createdAt)}
                  </small>
                </div>
              </div>
            ))}
            <>
              <div className="w-full flex relative">
                <input
                  type="text"
                  placeholder="Enter your reply"
                  value={answer}
                  onChange={(e: any) => setAnswer(e.target.value)}
                  className="ml-[60px] w-full p-2 border-b border-gray-300 focus:outline-none focus:border-gray-500"
                />
                <button
                  type="submit"
                  className="absolute right-0 bottom-0 p-2 text-slate-600 hover:text-black"
                  onClick={handleAnswerSubmit}
                  disabled={answer === "" || answerCreationLoading}
                >
                  Reply
                </button>
              </div>
            </>
          </>
        )}
      </div>
    </>
  );
};
export default CourseContentMedia;
