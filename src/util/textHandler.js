import React, { useEffect, useState } from "react";
import Typewriter from "typewriter-effect";
import TypeWriterEffect from "react-typewriter-effect";
import { Markup } from "interweave";

export default function textHandler(input, sound) {
  return <Markup content={input} />;
  //   return (
  //     <TypeWriterEffect
  //       cursorColor={"black"}
  //       text={input}
  //       typeSpeed={30}
  //       hideCursor={true}
  //       textStyle={{
  //         fontFamily:
  //           "source-code-pro, Menlo, Monaco, Consolas, 'Courier New', monospace",
  //         fontSize: "10px",
  //       }}
  //     />
  //   );
  //   <Typewriter
  //     onInit={(typewriter) => {
  //       typewriter
  //         .changeDelay(20)
  //         .typeString(input)
  //         .callFunction(() => {
  //           if (disableSound == false) {
  //             toggleWithSource();
  //           }
  //           alert(input);
  //         })
  //         .start();
  //     }}
  //   />
}
