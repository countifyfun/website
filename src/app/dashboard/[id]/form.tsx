"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { ServerWithData } from "@/utils/api";
import { Loader2, Save } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

export default function Form({
  server,
  setData,
}: {
  server: ServerWithData;
  setData: (formData: FormData) => Promise<void>;
}) {
  const [isLoading, setIsLoading] = useState(false);

  return (
    <form
      onSubmit={async (event) => {
        event.preventDefault();
        setIsLoading(true);

        const data = new FormData(event.currentTarget);
        await setData(data);
        toast.success("Settings saved!");

        setIsLoading(false);
      }}
      className="flex flex-col gap-2"
    >
      <div className="flex items-center gap-2 rounded-lg bg-neutral-900 p-4">
        <div>
          <Label className="text-sm">Counting Channel</Label>
          <Select name="channelId" defaultValue={server.channelId}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select a channel..." />
            </SelectTrigger>
            <SelectContent>
              {server.channels.map((channel) => (
                <SelectItem key={channel.id} value={channel.id}>
                  #{channel.name}
                </SelectItem>
              ))}
              {server.categories.map((category) => (
                <SelectGroup key={category.id}>
                  <SelectLabel>{category.name}</SelectLabel>
                  {category.channels.map((channel) => (
                    <SelectItem key={channel.id} value={channel.id}>
                      #{channel.name}
                    </SelectItem>
                  ))}
                </SelectGroup>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label htmlFor="count">Count</Label>
          <Input
            id="count"
            name="count"
            type="number"
            defaultValue={server.count}
          />
        </div>
      </div>
      <div className="flex flex-col gap-2">
        <h1 className="text-2xl font-bold tracking-tighter">Options</h1>
        <div className="flex flex-col gap-4 rounded-lg bg-neutral-900 p-4">
          <div className="flex items-center justify-between gap-2">
            <div>
              <Label htmlFor="one-by-one" className="font-medium">
                One by One
              </Label>
              <p className="text-sm text-neutral-500">
                Only allow one count per user. This makes sure users don&apos;t
                spam to fill your counting channel.
              </p>
            </div>
            <Switch
              id="one-by-one"
              name="oneByOne"
              defaultChecked={server.settings.oneByOne}
            />
          </div>
          <div className="flex items-center justify-between gap-2">
            <div>
              <Label htmlFor="reset-on-fail" className="font-medium">
                Reset on Fail
              </Label>
              <p className="text-sm text-neutral-500">
                The moment someone fails, the count will immediately be reset
                back to 0.
              </p>
            </div>
            <Switch
              id="reset-on-fail"
              name="resetOnFail"
              defaultChecked={server.settings.resetOnFail}
            />
          </div>
          <div className="flex items-center justify-between gap-2">
            <div>
              <Label htmlFor="no-deletion" className="font-medium">
                No Deletion
              </Label>
              <p className="text-sm text-neutral-500">
                Resend the last count if it gets deleted.
              </p>
            </div>
            <Switch
              id="no-deletion"
              name="noDeletion"
              defaultChecked={server.settings.noDeletion}
            />
          </div>
          <div className="flex items-center justify-between gap-2">
            <div>
              <Label htmlFor="pin-milestones" className="font-medium">
                Pin Milestones
              </Label>
              <p className="text-sm text-neutral-500">
                Pin a message every time a new milestone is reached. (10, 20,
                30, 40, 50, etc.)
              </p>
            </div>
            <Switch
              id="pin-milestones"
              name="pinMilestones"
              defaultChecked={server.settings.pinMilestones}
            />
          </div>
          <div className="flex items-center justify-between gap-2">
            <div>
              <Label htmlFor="visibility" className="font-medium">
                Visibility
              </Label>
              <p className="text-sm text-neutral-500">
                The visibility for this server.
              </p>
            </div>
            <RadioGroup
              id="visibility"
              name="visibility"
              defaultValue={server.settings.unlisted ? "unlisted" : "public"}
            >
              <div className="flex items-center gap-2">
                <RadioGroupItem value="public" id="public" />
                <Label htmlFor="public">Public</Label>
              </div>
              <div className="flex items-center gap-2">
                <RadioGroupItem value="unlisted" id="unlisted" />
                <Label htmlFor="unlisted">Unlisted</Label>
              </div>
            </RadioGroup>
          </div>
        </div>
      </div>
      <button
        type="submit"
        className="flex w-full items-center justify-center gap-1 rounded-lg bg-yellow-300 px-3 py-2 text-center font-medium text-black transition-all enabled:hover:opacity-75 disabled:cursor-not-allowed disabled:opacity-50"
        disabled={isLoading}
      >
        Save{" "}
        {isLoading ? (
          <Loader2 className="h-4 w-4 animate-spin" />
        ) : (
          <Save className="h-4 w-4" />
        )}
      </button>
    </form>
  );
}
