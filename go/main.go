/*
 * @Description:
 * @Version: 1.0
 * @Date: 2021-10-07 23:52:44
 * @LastEditTime: 2021-10-08 13:13:31
 */
package main

import (
	"fmt"

	"github.com/gin-gonic/gin"
)

func main() {
	gin.SetMode(gin.ReleaseMode)
	r := gin.Default()
	r.GET("/", func(c *gin.Context) {
		c.String(200, "hello")
	})
	r.Run()
	fmt.Println("fuck")
}
