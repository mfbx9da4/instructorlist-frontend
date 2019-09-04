# Dockerfile extending the generic Node image with application files for a
# single application.
FROM gcr.io/google_appengine/nodejs
COPY . /app/
# You have to specify "--unsafe-perm" with npm install
# when running as root.  Failing to do this can cause
# install to appear to succeed even if a preinstall
# script fails, and may have other adverse consequences
# as well.
# This command will also cat the npm-debug.log file after the
# build, if it exists.
WORKDIR /app/instructorlist-express
RUN yarn --unsafe-perm || \
  ((if [ -f npm-debug.log ]; then \
  cat npm-debug.log; \
  fi) && false)
EXPOSE 80
EXPOSE 8080
EXPOSE 443
CMD yarn start
