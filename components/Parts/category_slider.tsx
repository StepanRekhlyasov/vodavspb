import React, { memo, useCallback, useEffect, useState } from "react";
import { View } from "react-native";
import CatBlock from "./category-block";
import MyTypes from "../../store/types";

const CategorySlider = ({categories, sectionPosition, setSectionPosition, flatListRef} : {
	categories: MyTypes['Category'][],
	sectionPosition: string,
	setSectionPosition: any,
	flatListRef: any
}) => {
	useEffect(()=>{
		if(sectionPosition == 'Акции'){
			sectionPosition = 'Вода'
		}
		const result = categories.map(
			(item, index : number)=>(<CatBlock 
				flatListRef={flatListRef}
				key={index} 
				item={item} 
				active={item.name==sectionPosition?true:false}
				counter={{index: index, length: categories.length}}
			/>)
		)
		set_cat_grid(result)
	}, [categories, sectionPosition])

	const [cat_grid, set_cat_grid] = useState<any>()
	
	// const cat_grid = useCallback(()=>{return categories.map(
	// 	(item, index : number)=>(<CatBlock 
	// 		key={index} 
	// 		item={item} 
	// 		counter={{index: index, length: categories.length}}
	// 	/>)
	// )}, [])
	// console.log('cat_grid', cat_grid)
	return (
		cat_grid
	)
}
export default memo(CategorySlider)