import Page from "../animation/Page.tsx";
import Badge from "../components/badge/Badge.tsx";
import AnimatedButton from "../components/button/AnimatedButton.tsx";
import LandingPageCard from "../components/card/LandingPageCard.tsx";
import {
  Camera,
  Heart,
  MessageCircle,
  Music,
  Palette,
  Users,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const LandingPage = () => {
  const navigate = useNavigate();

  return (
    <Page className={"w-full h-auto flex flex-col gap-52"}>
      <div className={"grid lg:grid-cols-2 gap-12 items-center px-6 mx-auto"}>
        <div className={"space-y-8"}>
          <div className={"space-y-4"}>
            <Badge
              title={"New Social Media Era"}
              bgColor={"#14b8a6"}
              className={"font-medium "}
            />
            <h1 className="text-5xl lg:text-7xl font-bold leading-tight text-white-100">
              Express yourself{" "}
              <span className={"text-teal-100"}>without limits</span>
            </h1>
            <p className="text-xl leading-relaxed text-gray-300">
              Combine the creativity of Tumblr with the social power of
              Facebook. Create, share, meet people with similar passions.
            </p>
          </div>
          <div className={"flex "}>
            <AnimatedButton
              borderColor={"#767676"}
              borderColorHover={"#14b8a6"}
              className={
                "w-full h-[50px] text-lg font-medium border-2 rounded-lg border-gray-100 text-white-100 "
              }
              onClick={() => navigate("/sign-up")}
            >
              Start Your Journey
            </AnimatedButton>
          </div>
        </div>
        <div className={"relative"}>
          <div className={"grid grid-cols-2 gap-4"}>
            <LandingPageCard
              width={"w-full"}
              className={"border-gray-600 bg-black-200"}
            >
              <div className={"p-6"}>
                <Camera className={"size-8 text-teal-100 mb-4"} />
                <h3 className="font-semibold mb-2 text-white-100">
                  Multimedia
                </h3>
                <p className="text-sm text-gray-300">
                  Share photos, videos and gifs
                </p>
              </div>
            </LandingPageCard>
            <LandingPageCard
              width={"w-full"}
              className={"border-gray-600 bg-black-200 mt-8"}
            >
              <div className={"p-6"}>
                <MessageCircle className={"size-8 text-cyan-100 mb-4"} />
                <h3 className="font-semibold mb-2 text-white-100">Community</h3>
                <p className="text-sm text-gray-300">
                  Comment, react, make friends
                </p>
              </div>
            </LandingPageCard>
            <LandingPageCard
              width={"w-full -mt-4"}
              className={"border-gray-600 bg-black-200"}
            >
              <div className={"p-6"}>
                <Palette className={"size-8 text-teal-200 mb-4"} />
                <h3 className="font-semibold mb-2 text-white-100">
                  Creativity
                </h3>
                <p className="text-sm text-gray-300">
                  Personalize your blog profile
                </p>
              </div>
            </LandingPageCard>
            <LandingPageCard
              width={"w-full"}
              className={"border-gray-600 bg-black-200"}
            >
              <div className={"p-6"}>
                <Music className={"size-8 text-cyan-200 mb-4"} />
                <h3 className="font-semibold mb-2 text-white-100">Music</h3>
                <p className="text-sm text-gray-300">
                  Add soundtracks to posts
                </p>
              </div>
            </LandingPageCard>
          </div>
        </div>
      </div>
      <div className={"mx-auto px-6 w-full"}>
        <div className={"text-center mb-16"}>
          <h2
            className="text-4xl font-bold mb-4"
            style={{ color: "var(--color-white-100)" }}
          >
            Everything you need in one place
          </h2>
          <p className="text-xl" style={{ color: "var(--color-gray-300)" }}>
            Modern tools for self-expression and community building{" "}
          </p>
        </div>

        <div className={"grid md:grid-cols-3 gap-8"}>
          <LandingPageCard
            width={"w-full"}
            height={"h-fit"}
            className={"bg-black-200 text-gray-600"}
          >
            <div className={" p-8 text-center "}>
              <div
                className={
                  "size-16 rounded-full flex mx-auto items-center justify-center mb-6 bg-teal-100"
                }
              >
                <Users className={"size-8 text-black-400"} />
              </div>
              <h3
                className="text-xl font-semibold mb-4"
                style={{ color: "var(--color-white-100)" }}
              >
                Friends and community
              </h3>
              <p style={{ color: "var(--color-gray-300)" }}>
                Add friends, create groups, participate in discussions and meet
                people with similar interests.
              </p>
            </div>
          </LandingPageCard>
          <LandingPageCard
            width={"w-full"}
            height={"h-fit"}
            className={"bg-black-200 text-gray-600"}
          >
            <div className={"p-8 text-center"}>
              <div
                className={
                  "size-16 rounded-full flex mx-auto items-center justify-center mb-6 bg-cyan-100"
                }
              >
                <Camera className={"size-8 text-black-400"} />
              </div>
              <h3
                className="text-xl font-semibold mb-4"
                style={{ color: "var(--color-white-100)" }}
              >
                Multimedia blog
              </h3>
              <p style={{ color: "var(--color-gray-300)" }}>
                Create beautiful posts with images, videos, GIFs, and music.
                Personalize your profile like Tumblr.
              </p>
            </div>
          </LandingPageCard>
          <LandingPageCard
            width={"w-full"}
            height={"h-fit"}
            className={"bg-black-200 text-gray-600"}
          >
            <div className={"p-8 text-center"}>
              <div
                className={
                  "size-16 rounded-full flex mx-auto items-center justify-center mb-6 bg-teal-200"
                }
              >
                <Heart className={"size-8 text-black-400"} />
              </div>
              <h3
                className="text-xl font-semibold mb-4"
                style={{ color: "var(--color-white-100)" }}
              >
                Reactions and interactions
              </h3>
              <p style={{ color: "var(--color-gray-300)" }}>
                React to posts, comment, share content, and build an engaged
                community around your passions.
              </p>
            </div>
          </LandingPageCard>
        </div>
      </div>
      <div className={"px-6  w-full h-auto"}>
        <LandingPageCard
          width={"w-full"}
          height={"h-fit"}
          className={"bg-black-200 border-2 border-teal-100"}
        >
          <div className={"p-12 text-center"}>
            <h2 className="text-4xl font-bold mb-6 text-white-100">
              Ready for a new adventure?
            </h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto text-gray-300">
              Join thousands of users who have already discovered a new way to
              share their creativity and build community.
            </p>
            <AnimatedButton
              borderColor={"#14b8a6"}
              bgColor={"#222222"}
              bgColorHover={"#14b8a6"}
              className={"px-8 h-[50px] rounded-lg border-2"}
              onClick={() => navigate("/sign-up")}
            >
              Sign up for free
            </AnimatedButton>
          </div>
        </LandingPageCard>
      </div>
    </Page>
  );
};

export default LandingPage;
