'use strict';

import gulp = require('gulp')
import os = require('os')
import typescript = require('gulp-typescript')
import builder = require('electron-builder')

const platform = builder.Platform

const project = typescript.createProject('tsconfig.json')

gulp.task('compile:typescript', () => {
  const result = project.src()
        .pipe(project());
  return result.js.pipe(gulp.dest('build/app/local'))
})

gulp.task('build:electron', () => {
  if (os.platform() === 'darwin') {
    builder.build({
      targets: platform.MAC.createTarget()
    })
  } else if (os.platform() === 'linux') {
    builder.build({
      targets: platform.LINUX.createTarget()
    })
  } else if (os.platform() === 'win32') {
    builder.build({
      targets: platform.WINDOWS.createTarget()
    })
  } else {
    console.log('Xanite could not be built on ' + os.platform() + '.')
  }
})
