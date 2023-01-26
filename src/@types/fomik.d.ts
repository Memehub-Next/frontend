import { FormikHelpers } from "formik";

declare module "formik" {
  export type TOnSubmit<TValues> = (values: TValues, formikHelpers: FormikHelpers<TValues>) => void | Promise<any>;
}
