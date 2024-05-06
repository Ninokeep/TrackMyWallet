export default defineEventHandler(async (event) => {
  console.log("ici");

  return { message: "GET OK" };
});
