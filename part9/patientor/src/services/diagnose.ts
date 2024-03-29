import axios from "axios";
import { apiBaseUrl } from "../constants";
import { Diagnose } from "../types";

const getAll = async () => {
  const { data } = await axios.get<Diagnose[]>(
    `${apiBaseUrl}/diagnoses`
  );

  return data;
};

const getDiagnose = async (code: String) => {
  const { data } = await axios.get<Diagnose>(
    `${apiBaseUrl}/diagnoses/${code}`
  );
  return data;
}

const create = async (object: Diagnose) => {
  const { data } = await axios.post<Diagnose>(
    `${apiBaseUrl}/diagnoses`,
    object
  );

  return data;
};

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  getAll, getDiagnose, create
};