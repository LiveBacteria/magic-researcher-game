import React, { useCallback, useEffect, useState } from "react";
import { Paper } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import { useHistory } from "react-router-dom";

const credits = [
  {
    type: "Art",
    creator: "darkwood67",
    copyrightType:
      "https://opengameart.org/sites/default/files/license_images/cc-by.png",
    source: "http://darkwood67.deviantart.com/gallery/",
  },
  {
    type: "Art",
    creator: "DitzyDM, Traipse OpenRPG",
    copyrightType:
      "https://opengameart.org/sites/default/files/license_images/cc-by.png",
    source: "https://opengameart.org/content/rpg-icons",
  },
  {
    type: "Sounds",
    creator: "ObsydianX",
    copyrightType:
      "https://opengameart.org/sites/default/files/license_images/cc-by.png",
    source: "https://obsydianx.itch.io/interface-sfx-pack-1",
  },
  {
    type: "Sounds",
    creator: "spookymodem",
    copyrightType:
      "https://opengameart.org/sites/default/files/license_images/cc-by.png",
    source: "https://freesound.org/people/spookymodem/sounds/249819/",
  },
  {
    type: "Sounds",
    creator: "renatalmar",
    copyrightType:
      "https://opengameart.org/sites/default/files/license_images/cc-by.png",
    source: "https://freesound.org/people/renatalmar/sounds/264981/",
  },
];

export default function Credits() {
  let history = useHistory();
  function handleRedirect() {
    history.push("/");
  }
  return (
    <div>
      <Paper className="credits">
        {credits.map((item) => {
          return (
            <div>
              <p>{item.type}</p>
              <div>
                <span>{item.creator}</span>
                {item.source ? (
                  <div>
                    <a href={item.source}>Source</a>{" "}
                  </div>
                ) : (
                  ""
                )}
              </div>
              <img src={item.copyrightType} />
            </div>
          );
        })}
      </Paper>
      <Button
        variant="contained"
        onClick={() => handleRedirect()}
        className="creditButton"
      >
        HOME
      </Button>
    </div>
  );
}
