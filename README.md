# Nimbus cloud storage

A better cloud

## Quickstart

### 1. Clone the Repository

```bash
git clone https://github.com/nimbusdotstorage/Nimbus.git
cd Nimbus
```

### 2. Install Dependencies

```bash
bun i
```

### 3. Set Up Postgres with Docker

We use Docker to run a PostgreSQL database for local development. Follow these steps to set it up:

1. **Start the database**:

   ```bash
   bun db:up
   ```

   This will start a Postgres container with default credentials:

   - Host: `localhost`
   - Port: `5432`
   - Database: `nimbus`
   - Username: `postgres`
   - Password: `postgres`

2. **Verify the database is running if running a detached container**:

   ```bash
   docker compose ps
   ```

   You should see the `nimbus-db` container in the list with a status of "Up".

3. **Connect to the database** (optional):

   ```bash
   # Using psql client inside the container
   docker compose exec postgres psql -U postgres -d nimbus
   ```

### 4. Environment Setup

Copy the `.env.example` file to `.env` using this command, `cp .env.example .env` and fill in these values:

<details>
<summary>How to setup Google keys?</summary>
<br>

- Navigate to Google Cloud [console](https://console.cloud.google.com/).

- Create a new project and navigate to its dashboard.

- Under <b>API & Services</b>, navigate to <b>Oauth Consent Screen</b> and enter the details.

- Now create a client. Add <b>Authorised Javascript origin</b> as `http://localhost:3000` and <b> Authorised redirect
  uri</b> as `http://localhost:1284/api/auth/callback/google` and get your `client_id` and `client_secret`.

- Now navigate to <b>Audience</b> and add <b>Test users</b>.
</details>

```bash
GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=

# To generate a secret, just run `openssl rand -base64 32`
BETTER_AUTH_SECRET=
```

<details>
<summary>How to get a Resend API Key?</summary>
<br>

1. Go to [Resend.com](https://resend.com) and sign up or log in to your account.
2. From the dashboard, click on **"API Keys"** in the sidebar.
3. Click the **"Create API Key"** button.
4. Enter a name for your key (e.g., `nimbus-dev`) and confirm.
5. Copy the generated API key.

6. Add it to your `.env` file:
   </details>

   ```bash
   RESEND_API_KEY=your-api-key-here
   ```

### 5. Run Database Migrations

After setting up the database, run the migrations:

```bash
bun db:migrate
```

### 6. Start the Development Server

In a new terminal, start the development server:

> NOTE: this starts both the web and server development servers, to run just one, use `bun dev:web` or `bun dev:server`.
> Both will need the db running to work.

```bash
bun dev
```

The application should now be running at [http://localhost:3000](http://localhost:3000)

### 7. Access Authentication

Once the development server is running, you can access the authentication pages:

- **Sign In**: Navigate to [http://localhost:3000/signin](http://localhost:3000/signin)
- **Sign Up**: Navigate to [http://localhost:3000/signup](http://localhost:3000/signup)

Make sure you have configured the Google OAuth credentials in your `.env` file as described in step 4 for authentication
to work properly. Additionally, configure your Resend API key for the forgot password functionality to work.

If you want to contribute, please refer to the
[contributing guide](https://github.com/nimbusdotstorage/Nimbus/blob/main/CONTRIBUTING.md)

## Our Amazing Contributors

<a href="https://github.com/nimbusdotstorage/Nimbus/graphs/contributors">
  <img src="https://contrib.rocks/image?repo=nimbusdotstorage/Nimbus" />
</a>
