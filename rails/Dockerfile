FROM ruby:3.3

# Set environment variables
ENV LANG=C.UTF-8 \
    BUNDLER_VERSION=2.4.22

# Install dependencies
# RUN apt-get update -qq && apt-get install -y \
#     build-essential \
#     git \
#     curl

# Install bundler and Rails
RUN gem install bundler
RUN gem install rails

# Set working directory
WORKDIR /usr/src/app

# Copy project files
COPY . .

# Install gems
RUN bundle install

# Expose default Rails port
EXPOSE 3000

CMD ["rails", "server", "-b", "0.0.0.0"]
