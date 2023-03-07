import React, { memo, useCallback, useEffect, useState } from "react";
import { View } from "react-native";
import CatBlock from "./category-block";
import MyTypes from "../../store/types";

const CategorySlider = ({categories, sectionPosition, flatListRef, indexes} : {
	categories: MyTypes['Category'][],
	sectionPosition: number | undefined,
	setSectionPosition: any,
	flatListRef: any, 
	indexes: any
}) => {
	// console.log('sections rerenders')
	useEffect(()=>{
		const result = categories.map(
			(item, index : number)=>(<CatBlock 
				flatListRef={flatListRef}
				key={index} 
				item={item} 
				active={item.ID === sectionPosition?true:false}
				counter={{index: index, length: categories.length}}
				indexes={indexes}
			/>)
		)
		set_cat_grid(result)
	}, [categories, sectionPosition])

	const [cat_grid, set_cat_grid] = useState<any>()
	
	return (
		cat_grid
	)
}
export default memo(CategorySlider)