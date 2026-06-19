# Basic Resume Example

Basic Resume Example using React. This is used as a demonstration in a course about Cloud Run Functions with GCP and not for real-world use. You can use this to practice by your own!

## Where to place the Cloud Function URL?

On your local folder, create a file called .env, and inside there create a variable called followed by the URL of your cloud function, like this:

VITE_NAME_FUNCTION_URL=https://REGION-PROJECT_ID.cloudfunctions.net/getName

Remember that your Cloud Functions needs to return a JSON like the following example:

{
    name: "Alex Rivera",
    title: "Senior Software Developer",
    email: "arivera.dev@email.com",
    phone: "+1 5550000000",
    location: "Austin, TX",
    profilepic: "https://i.pravatar.cc/400?img=12",
    linkedin: "linkedin.com/in/alexrivera-dev",
    github: "github.com/alexrivera-dev",
    status: "success",
    timestamp: new Date().toISOString()
}



