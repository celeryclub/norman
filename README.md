brew install postgresql
/usr/local/opt/postgres/bin/createuser -s postgres
/usr/local/opt/postgres/bin/createdb norman

echo > .env DATABASE_URL=postgres://postgres@127.0.0.1:5432/norman

<!-- ^ fix this -->

brew services start postgresql
brew services stop postgresql

install heroku cli
`brew tap heroku/brew && brew install heroku`

set up the heroku remote

`git remote add heroku https://git.heroku.com/norman-api.git`

heroku run yarn migrate:prod

potential column?
// Niche Zero
// roastSize
