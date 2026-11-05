import { http } from "../api/http";

export default function CreateBatchButton() {

  async function createBatch() {

    const count =
      prompt(
        "Сколько футболок создать?"
      );

    if (!count) {
      return;
    }

    await http.post(
      "/admin/batches/create",
      {
        count:
          Number(count)
      }
    );

    window.location.reload();

  }

  return (
    <button
      onClick={createBatch}
    >
      Создать партию
    </button>
  );

}