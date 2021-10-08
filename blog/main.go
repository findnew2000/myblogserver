/*
 * @Description:
 * @Version: 1.0
 * @Date: 2021-10-08 15:40:03
 * @LastEditTime: 2021-10-08 18:32:42
 */
package main

import (
	"net/http"

	"github.com/gin-gonic/gin"
)

func main() {
	// gin.SetMode(gin.ReleaseMode)
	r := gin.Default()
	r.GET("/", func(c *gin.Context) {
		c.String(http.StatusOK, "hello")
	})
	v2 := r.Group("/v2")
	{
		v2.GET("/api", func(c *gin.Context) {
			c.String(http.StatusOK, "v2/api")
		})
	}
	r.Run(":80")
}
