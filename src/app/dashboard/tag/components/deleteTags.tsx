"use client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
  Form,
  FormDescription,
} from "@/components/ui/form";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { AuthContext, useAuth } from "@/context/authContext";
import forceLogout from "@/hooks/use-logout";
import { trpc } from "@/lib/trpc/trpcClient";
import {
  DeleteCategorySchema,
  DeleteCategoryType,
} from "@/validators/categoryValidator";
import { zodResolver } from "@hookform/resolvers/zod";
import { Session } from "@supabase/supabase-js";
import { LoaderPinwheel } from "lucide-react";

import { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

export default function DeleteTags() {
  
  };

  return (
    <section className="w-full">
      <Card className="w-full">
        <CardHeader>
          <CardTitle>Deletar categorias</CardTitle>
          <CardDescription>
            Delete uma categoria que você criou.
          </CardDescription>
        </CardHeader>
        <CardContent>
          
        </CardContent>
      </Card>
    </section>
  );
}
