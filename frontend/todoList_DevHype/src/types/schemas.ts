import { z } from 'zod'

// Task
export const taskSchema = z.object({
    title: z.string().min(5, "El titulo debe ser mayor a 4 caracteres"),
    description: z.string().nonempty("Ingrese una descripción"),
    finalDate: z.string().nonempty("La fecha de cierre es requerida")
})

export type TaskSchema = z.infer<typeof taskSchema>

// Sprint
export const sprintSchema = z.object({
    name: z.string().min(5, "El nombre debe ser mayor a 4 caracteres"),
    initialDate: z.string().nonempty("La fecha de inicio es requerida"),
    finalDate: z.string().nonempty("La fecha de cierre es requerida"),
}).superRefine((data, ctx) => { // Aquí comenzamos con superRefine
    // `ctx` es el contexto que Zod pasa a esta función de validación.
    // `ctx.addIssue` se usa para agregar errores de validación personalizados.

    const today = new Date();
    const initial = new Date(data.initialDate);
    const final = new Date(data.finalDate);

    // Comparamos solo las fechas sin horas.
    today.setHours(0, 0, 0, 0);
    initial.setHours(0, 0, 0, 0);
    final.setHours(0, 0, 0, 0);

    // Validación de la fecha de inicio no puede ser anterior a hoy.
    if (initial < today) {
      ctx.addIssue({
        code: "custom",
        path: ["initialDate"],
        message: "La fecha de inicio no puede ser anterior a hoy",
      });
    }

    // Validación de la fecha de cierre no puede ser anterior a hoy.
    if (final < today) {
      ctx.addIssue({
        code: "custom",
        path: ["finalDate"],
        message: "La fecha de cierre no puede ser anterior a hoy",
      });
    }

    // Validación de que la fecha de cierre no puede ser anterior a la fecha de inicio.
    if (final < initial) {
      ctx.addIssue({
        code: "custom",
        path: ["finalDate"],
        message: "La fecha de cierre no puede ser anterior a la fecha de inicio",
      });
    }
})

export type SprintSchema = z.infer<typeof sprintSchema>