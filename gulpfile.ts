"use strict";

import gulp = require("gulp");
import os = require("os");
import typescript = require("gulp-typescript");
import builder = require("electron-builder");

const Platform = builder.Platform;

const project = typescript.createProject("tsconfig.json");

gulp.task("compile:typescript", () => {
  let result = project.src()
        .pipe(typescript(project));
  return result.js.pipe(gulp.dest("build/app/local"));
});

gulp.task("build:electron", () => {
  if (os.platform() === "darwin") {
    builder.build({
      targets: Platform.MAC.createTarget()
    });
  } else if (os.platform() === "linux") {
    builder.build({
      targets: Platform.LINUX.createTarget()
    });
  } else if (os.platform() === "win32") {
    builder.build({
      targets: Platform.WINDOWS.createTarget()
    });
  } else {
    console.log("Xanite could not be built on " + os.platform() + ".");
  }
});
