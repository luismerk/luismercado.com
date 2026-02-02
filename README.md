# Personal Site
Rails 8 + React 19 site deployed to AWS Elastic Beanstalk with GitHub Actions CI/CD, HTTPS, and CloudFront.

## Features
- Ruby 3.3 + Rails 8
- React 19 + React Router 7
- Responsive CSS
- Elastic Beanstalk production-ready
- HTTPS via ACM + CloudFront
- CI/CD with GitHub Actions

## Initial Setup
```
rbenv install 3.3.10
rbenv shell --unset
rbenv shell 3.3.10
rbenv global 3.3.10

bundle install
npm install

gem install foreman

npm run dev

```