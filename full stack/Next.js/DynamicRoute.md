

```js
import { getService } from "@/services/getServices";

const SingleService = async ({params}) => {
  // console.log("Params is:", params);
  const { service_id = "", title = "", img = "", price = "", description = "", facility = [] } = await getService(params.id)
  return (
    <div>
      this is SingleService details
    </div>
  );
};

export default SingleService;
```