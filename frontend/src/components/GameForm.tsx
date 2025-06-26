import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import type { GamePayload, GameFormFields } from "../types/Game";


const gameSchema = z.object({
  title: z.string().min(2, "Title is required"),
  description: z.string().min(10, "Description is required"),
  category: z.string().min(2, "Category is required"),
  price: z.coerce.number().positive({ message: "Price must be a positive number" }),
  rating: z.coerce.number().min(0).max(5),
  stock: z.coerce.number().min(0).optional(),
  tags: z.preprocess(
    val =>
      typeof val === "string"
        ? val.split(",").map(s => s.trim()).filter(Boolean)
        : Array.isArray(val)
        ? val
        : [],
    z.array(z.string()).optional()
  ),
  brand: z.string().optional().or(z.literal("")),
  thumbnail: z.string().url("Thumbnail must be a valid URL").optional(),
  images: z.preprocess(
    val =>
      typeof val === "string"
        ? val.split(",").map(s => s.trim()).filter(Boolean)
        : Array.isArray(val)
        ? val
        : [],
    z.array(z.string()).optional()
  ),
});

type GameFormProps = {
  defaultValues?: Partial<GameFormFields>;
  onSubmit: (data: GamePayload) => void;
  isLoading?: boolean;
  submitLabel?: string;
};

const GameForm = ({ defaultValues, onSubmit, isLoading, submitLabel }: GameFormProps) => {

  const { register, handleSubmit, formState: { errors } } = useForm<GameFormFields>({
    resolver: zodResolver(gameSchema),
    defaultValues: defaultValues ?? {}
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 my-16 max-w-4xl mx-auto bg-gray-900 p-8 rounded-2xl shadow">
    <div>   
      <label className="block text-yellow-400 mb-1">Title</label>
      <input className="w-full px-4 py-2 rounded bg-gray-800 text-gray-100"
        {...register("title")}
      />
      {errors.title && <p className="text-red-400 text-xs">{errors.title.message}</p>}
    </div>
    <div>
      <label className="block text-yellow-400 mb-1">Description</label>
      <textarea className="w-full px-4 py-2 rounded bg-gray-800 text-gray-100" rows={4}
        {...register("description")}
      />
      {errors.description && <p className="text-red-400 text-xs">{errors.description.message}</p>}
    </div>
    <div>
      <label className="block text-yellow-400 mb-1">Category</label>
      <input className="w-full px-4 py-2 rounded bg-gray-800 text-gray-100"
        {...register("category")}
      />
      {errors.category && <p className="text-red-400 text-xs">{errors.category.message}</p>}
    </div>
    <div className="flex gap-4">
      <div className="flex-1">
        <label className="block text-yellow-400 mb-1">Price</label>
        <input type="number" step="0.01" min="0" className="w-full px-4 py-2 rounded bg-gray-800 text-gray-100"
          {...register("price", { valueAsNumber: true })}
        />
        {errors.price && <p className="text-red-400 text-xs">{errors.price.message}</p>}
      </div>
      <div className="flex-1">
        <label className="block text-yellow-400 mb-1">Rating</label>
        <input type="number" step="0.01" min="0" max="5" className="w-full px-4 py-2 rounded bg-gray-800 text-gray-100"
          {...register("rating", { valueAsNumber: true })}
        />
        {errors.rating && <p className="text-red-400 text-xs">{errors.rating.message}</p>}
      </div>
      <div className="flex-1">
        <label className="block text-yellow-400 mb-1">Stock</label>
        <input type="number" min="0" className="w-full px-4 py-2 rounded bg-gray-800 text-gray-100"
          {...register("stock", { valueAsNumber: true })}
        />
        {errors.stock && <p className="text-red-400 text-xs">{errors.stock.message}</p>}
      </div>
    </div>
    <div>
      <label className="block text-yellow-400 mb-1">Tags <span className="text-gray-400">(comma-separated)</span></label>
      <input className="w-full px-4 py-2 rounded bg-gray-800 text-gray-100"
        placeholder="action, adventure, rpg"
        {...register("tags")}
      />
      {errors.tags && <p className="text-red-400 text-xs">{errors.tags.message}</p>}
    </div>
    <div>
      <label className="block text-yellow-400 mb-1">Brand</label>
      <input className="w-full px-4 py-2 rounded bg-gray-800 text-gray-100"
        {...register("brand")}
      />
      {errors.brand && <p className="text-red-400 text-xs">{errors.brand.message}</p>}
    </div>
    <div>
      <label className="block text-yellow-400 mb-1">Thumbnail URL</label>
      <input className="w-full px-4 py-2 rounded bg-gray-800 text-gray-100"
        placeholder="https://..."
        {...register("thumbnail")}
      />
      {errors.thumbnail && <p className="text-red-400 text-xs">{errors.thumbnail.message}</p>}
    </div>
    <div>
      <label className="block text-yellow-400 mb-1">Gallery Images<span className="text-gray-400">(comma-separated URLs)</span></label>
      <input className="w-full px-4 py-2 rounded bg-gray-800 text-gray-100"
        placeholder="https://img1.jpg, https://img2.jpg"
        {...register("images")}
      />
      {errors.images && <p className="text-red-400 text-xs">{errors.images.message}</p>}
    </div>
    <button
      type="submit"
      className="bg-yellow-400 text-white px-6 py-2 rounded-xl font-bold shadow hover:bg-yellow-500 transition w-full mt-4"
      disabled={isLoading}
    >
      {isLoading ? "Saving..." : (submitLabel || "Save")}
    </button>
  </form>
  )
}

export default GameForm