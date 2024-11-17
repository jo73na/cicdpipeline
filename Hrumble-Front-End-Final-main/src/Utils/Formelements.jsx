import React from "react"

export const Button = React.lazy(() => import(/* webpackChunkName: "sula-antd" */ 'antd/lib/button/button'));
export const Input = React.lazy(() => import(/* webpackChunkName: "sula-antd" */ 'antd/lib/input/Input'));
export const Form = React.lazy(() => import(/* webpackChunkName: "sula-antd" */ 'antd/lib/form/Form'));
export const FormItem = React.lazy(() => import(/* webpackChunkName: "sula-antd" */ 'antd/lib/form/FormItem'));
export const Select = React.lazy(() => import('antd/lib/select'));


