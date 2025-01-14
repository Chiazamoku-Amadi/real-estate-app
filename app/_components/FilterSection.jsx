import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Bath, BedDouble, CarFront } from "lucide-react";

const FilterSection = ({
  setBedCount,
  setBathCount,
  setParkingCount,
  setPropertyType,
}) => {
  return (
    <div className="flex items-center gap-2 px-3 py-2">
      <Select onValueChange={setBedCount}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Bed" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="2">
            <h2 className="flex gap-2">
              <BedDouble className="text-primary h-5 w-5" />
              2+
            </h2>
          </SelectItem>
          <SelectItem value="3">
            <h2 className="flex gap-2">
              <BedDouble className="text-primary h-5 w-5" />
              3+
            </h2>
          </SelectItem>
          <SelectItem value="4">
            <h2 className="flex gap-2">
              <BedDouble className="text-primary h-5 w-5" />
              4+
            </h2>
          </SelectItem>
          <SelectItem value="5">
            <h2 className="flex gap-2">
              <BedDouble className="text-primary h-5 w-5" />
              5+
            </h2>
          </SelectItem>
        </SelectContent>
      </Select>

      <Select onValueChange={setBathCount}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Bath" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="2">
            <h2 className="flex gap-2">
              <Bath className="text-primary h-5 w-5" />
              2+
            </h2>
          </SelectItem>
          <SelectItem value="3">
            <h2 className="flex gap-2">
              <Bath className="text-primary h-5 w-5" />
              3+
            </h2>
          </SelectItem>
          <SelectItem value="4">
            <h2 className="flex gap-2">
              <Bath className="text-primary h-5 w-5" />
              4+
            </h2>
          </SelectItem>
          <SelectItem value="5">
            <h2 className="flex gap-2">
              <Bath className="text-primary h-5 w-5" />
              5+
            </h2>
          </SelectItem>
        </SelectContent>
      </Select>

      <Select onValueChange={setParkingCount}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Parking" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="1">
            <h2 className="flex gap-2">
              <CarFront className="text-primary h-5 w-5" />
              1+
            </h2>
          </SelectItem>
          <SelectItem value="2">
            <h2 className="flex gap-2">
              <CarFront className="text-primary h-5 w-5" />
              2+
            </h2>
          </SelectItem>
          <SelectItem value="3">
            <h2 className="flex gap-2">
              <CarFront className="text-primary h-5 w-5" />
              3+
            </h2>
          </SelectItem>
        </SelectContent>
      </Select>

      <Select
        onValueChange={(value) =>
          value === "All" ? setPropertyType(null) : setPropertyType(value)
        }
      >
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Home Type" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="All">All</SelectItem>
          <SelectItem value="Single Family Home">Single Family Home</SelectItem>
          <SelectItem value="Town House">Town House</SelectItem>
          <SelectItem value="Condo">Condo</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
};

export default FilterSection;
