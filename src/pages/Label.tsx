import { TodoTemplate } from "../containers/TodoTemplate";
import { useGetLabel, usePutLabel, usePostRoutine } from "../hooks/api";

function LabelPage() {
  return (
    <TodoTemplate
      id={0}
      name="label"
      onGet={useGetLabel}
      onPut={usePutLabel}
      onPost={usePostRoutine}
    >
      <div>Label</div>
    </TodoTemplate>
  );
}

export default LabelPage;
